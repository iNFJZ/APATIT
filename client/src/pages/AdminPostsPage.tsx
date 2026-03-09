import React, { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { CalendarDays, Edit, Trash2, ExternalLink, FileText } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/lib/toast";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  type: string;
  publishedAt: string;
  isPublished: boolean;
};

const POSTS_QUERY_KEY = ["/api/posts?onlyPublished=false"];

export default function AdminPostsPage() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery<{ posts: PostRow[] }>({
    queryKey: POSTS_QUERY_KEY,
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/posts/${id}`);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: POSTS_QUERY_KEY });
      const prev = queryClient.getQueryData<{ posts: PostRow[] }>(POSTS_QUERY_KEY);
      if (prev?.posts) {
        queryClient.setQueryData(POSTS_QUERY_KEY, {
          posts: prev.posts.filter((p) => p.id !== id),
        });
      }
      return { prev };
    },
    onSuccess: (_, id) => {
      setDeleteId(null);
      toast.success("Đã xóa bài viết.", "Bài viết đã được xóa khỏi danh sách.");
    },
    onError: (err: Error, id, context) => {
      if (context?.prev) {
        queryClient.setQueryData(POSTS_QUERY_KEY, context.prev);
      }
      toast.error("Không thể xóa bài viết.", err.message);
    },
  });

  const posts = data?.posts ?? [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-heading font-bold text-secondary">Tin tức & Thông báo</h1>
          <Link href="/admin/posts/moi">
            <Button className="rounded-full">Đăng bài mới</Button>
          </Link>
        </div>

        {isLoading && (
          <p className="text-muted-foreground">Đang tải danh sách...</p>
        )}

        {isError && (
          <p className="text-destructive">Không tải được danh sách bài viết. Vui lòng thử lại.</p>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-muted-foreground mb-4">Chưa có bài viết nào.</p>
            <Link href="/admin/posts/moi">
              <Button>Đăng bài đầu tiên</Button>
            </Link>
          </div>
        )}

        {!isLoading && !isError && posts.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-4 py-3 font-semibold text-secondary">Tiêu đề</th>
                    <th className="px-4 py-3 font-semibold text-secondary w-28">Loại</th>
                    <th className="px-4 py-3 font-semibold text-secondary w-32">Ngày đăng</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-secondary w-28">Trạng thái</th>
                    <th className="px-4 py-3 font-semibold text-secondary w-40 text-left">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="align-middle px-4 py-3">
                        <span className="font-medium text-secondary line-clamp-1">{post.title}</span>
                      </td>
                      <td className="align-middle px-4 py-3 text-sm text-muted-foreground">
                        {post.type === "NEWS" ? "Tin tức" : "Thông báo"}
                      </td>
                      <td className="align-middle px-4 py-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="w-4 h-4 shrink-0" />
                          {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                        </span>
                      </td>
                      <td className="align-middle px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            post.isPublished ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {post.isPublished ? "Đã đăng" : "Nháp"}
                        </span>
                      </td>
                      <td className="align-middle px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {post.isPublished && (
                            <a
                              href={post.type === "NEWS" ? `/tin-tuc/${post.slug}` : `/cong-bo-thong-tin/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                              aria-label="Xem bài"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <Link href={`/admin/posts/edit/${post.slug}`}>
                            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Sửa">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-destructive hover:text-destructive"
                            aria-label="Xóa"
                            onClick={() => setDeleteId(post.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa bài viết</AlertDialogTitle>
            <AlertDialogDescription>
              Bài viết sẽ bị xóa vĩnh viễn. Bạn có chắc chắn muốn xóa?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
