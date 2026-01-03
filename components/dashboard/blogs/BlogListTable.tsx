"use client";

import { Blog } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  MoreHorizontal,
  CheckCircle2,
  CircleDashed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { format } from "date-fns"; // Recommended for date formatting

interface BlogListTableProps {
  initialData: Blog[];
}

export function BlogListTable({ initialData }: BlogListTableProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This action will terminate the record."))
      return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  };

  return (
    <Table>
      <TableHeader className="bg-zinc-900/50">
        <TableRow className="border-zinc-800 hover:bg-transparent">
          <TableHead className="font-mono text-[10px] uppercase text-zinc-500">
            Entry_Title
          </TableHead>
          <TableHead className="font-mono text-[10px] uppercase text-zinc-500">
            Status
          </TableHead>
          <TableHead className="font-mono text-[10px] uppercase text-zinc-500">
            Timestamp
          </TableHead>
          <TableHead className="font-mono text-[10px] uppercase text-zinc-500 text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialData.length === 0 ? (
          <TableRow className="border-zinc-800">
            <TableCell
              colSpan={4}
              className="h-24 text-center font-mono text-zinc-600"
            >
              NO_RECORDS_FOUND.LOG
            </TableCell>
          </TableRow>
        ) : (
          initialData.map((blog) => (
            <TableRow
              key={blog.id}
              className="border-zinc-800 hover:bg-zinc-900/40 transition-colors group"
            >
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span className="text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    {blog.title}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-600">
                    slug: /{blog.slug}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {blog.status === "published" ? (
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1.5 font-mono text-[10px]">
                    <CheckCircle2 size={10} /> PUBLISHED
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-zinc-500 border-zinc-800 gap-1.5 font-mono text-[10px]"
                  >
                    <CircleDashed size={10} /> DRAFT
                  </Badge>
                )}
              </TableCell>
              <TableCell className="font-mono text-xs text-zinc-500">
                {format(new Date(blog.createdAt), "yyyy-MM-dd HH:mm")}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-zinc-500 hover:text-white"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-zinc-950 border-zinc-800 text-zinc-300 font-mono text-xs"
                  >
                    <DropdownMenuItem
                      onClick={() =>
                        window.open(`/blog/${blog.slug}`, "_blank")
                      }
                      className="gap-2 cursor-pointer hover:bg-zinc-900 hover:text-emerald-400"
                    >
                      <Eye size={14} /> view_live
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-zinc-900 hover:text-emerald-400">
                      <Edit size={14} /> edit_content
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(blog.id)}
                      className="gap-2 cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={14} /> rm_-rf_entry
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
