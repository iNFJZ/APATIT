import React, { useRef, useState, useEffect } from "react";
import { Link, useRoute, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { slugify } from "@/lib/slugify";
import { toast } from "@/lib/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ImagePlus } from "lucide-react";

type PostPayload = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  type: "NEWS" | "ANNOUNCEMENT";
  publishedAt: string;
  isPublished?: boolean;
};

type PostDetail = PostPayload & {
  id: string;
  isPublished: boolean;
};
type PostingMode = "manual" | "upload";

function insertAtCursor(textarea: HTMLTextAreaElement, insertion: string): string {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);
  return before + insertion + after;
}

export default function AdminPostFormPage() {
  const [matchId, paramsId] = useRoute<{ id: string }>("/admin/posts/:id");
  const [matchSlug, paramsSlug] = useRoute<{ slug: string }>("/admin/posts/edit/:slug");
  const id = paramsId?.id ?? "";
  const slugParam = paramsSlug?.slug ?? "";
  const isEditById = matchId && id !== "moi";
  const isEditBySlug = Boolean(matchSlug && slugParam);
  const isEdit = isEditById || isEditBySlug;
  const [, setLocation] = useLocation();

  const queryClient = useQueryClient();
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [postId, setPostId] = useState<string>("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentInputKey, setDocumentInputKey] = useState<number>(0);
  const [postingMode, setPostingMode] = useState<PostingMode>("manual");
  const [type, setType] = useState<"NEWS" | "ANNOUNCEMENT">("NEWS");
  const [publishedAt, setPublishedAt] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageAltInput, setImageAltInput] = useState("");

  function handleDocumentFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0] ?? null;
    setDocumentFile(file);
    if (file) {
      setPostingMode("upload");
    }
  }

  function handleClearDocumentFile(): void {
    setDocumentFile(null);
    setDocumentInputKey((prev) => prev + 1);
  }

  const queryBySlug = useQuery<{ post: PostDetail }>({
    queryKey: ["/api/posts", slugParam, "onlyPublished=false"],
    queryFn: async () => {
      const url = `/api/posts/${encodeURIComponent(slugParam)}?onlyPublished=false`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(res.status === 404 ? "Không tìm thấy bài viết." : text || `${res.status}`);
      }
      return res.json() as Promise<{ post: PostDetail }>;
    },
    enabled: isEditBySlug && Boolean(slugParam),
  });

  const queryById = useQuery<{ post: PostDetail }>({
    queryKey: ["/api/posts/by-id", id],
    queryFn: async () => {
      const url = `/api/posts/by-id/${id}`;
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 401) {
        throw new Error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      }
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(res.status === 404 ? "Không tìm thấy bài viết." : text || `${res.status}`);
      }
      return res.json() as Promise<{ post: PostDetail }>;
    },
    enabled: isEditById && Boolean(id),
  });

  const data = isEditBySlug ? queryBySlug.data : queryById.data;
  const isLoadingPost = isEditBySlug ? queryBySlug.isLoading : queryById.isLoading;
  const isPostError = isEditBySlug ? queryBySlug.isError : queryById.isError;
  const postError = isEditBySlug ? queryBySlug.error : queryById.error;
  const currentId = postId || data?.post?.id || id;

  useEffect(() => {
    if (!data?.post) {
      return;
    }
    const p = data.post;
    setPostId(p.id);
    setSlug(p.slug);
    setTitle(p.title);
    setSummary(p.summary);
    setContent(p.content);
    setImageUrl(p.imageUrl ?? "");
    setType(p.type as "NEWS" | "ANNOUNCEMENT");
    setPublishedAt(p.publishedAt.slice(0, 10));
    setIsPublished(p.isPublished);
  }, [data?.post]);

  const createMutation = useMutation({
    mutationFn: async (payload: PostPayload) => {
      const res = await apiRequest("POST", "/api/posts", {
        ...payload,
        imageUrl: payload.imageUrl || null,
        isPublished: payload.isPublished ?? false,
      });
      return res.json() as Promise<{ post: PostDetail }>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["/api/posts?onlyPublished=false"] });
      toast.success("Đã tạo bài viết.");
      setLocation("/admin/posts");
    },
    onError: (err: Error) => {
      toast.error("Không thể tạo bài viết.", err.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: Partial<PostPayload>) => {
      const res = await apiRequest("PATCH", `/api/posts/${currentId}`, {
        ...payload,
        imageUrl: payload.imageUrl !== undefined ? (payload.imageUrl || null) : undefined,
      });
      return res.json() as Promise<{ post: PostDetail }>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["/api/posts?onlyPublished=false"] });
      void queryClient.invalidateQueries({ queryKey: ["/api/posts/by-id", currentId] });
      if (slugParam) {
        void queryClient.invalidateQueries({
          queryKey: ["/api/posts", slugParam, "onlyPublished=false"],
        });
      }
      toast.success("Đã cập nhật bài viết.");
    },
    onError: (err: Error) => {
      toast.error("Không thể cập nhật bài viết.", err.message);
    },
  });

  const createFromDocumentMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/posts/from-document", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `${res.status}`);
      }
      return (await res.json()) as Promise<{ post: PostDetail }>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["/api/posts?onlyPublished=false"] });
      toast.success("Đã tạo bài viết từ tài liệu.");
      setLocation("/admin/posts");
    },
    onError: (err: Error) => {
      toast.error("Không thể tạo bài viết.", err.message);
    },
  });

  const updateFromDocumentMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`/api/posts/${currentId}/from-document`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `${res.status}`);
      }
      return (await res.json()) as Promise<{ post: PostDetail }>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["/api/posts?onlyPublished=false"] });
      void queryClient.invalidateQueries({ queryKey: ["/api/posts/by-id", currentId] });
      if (slugParam) {
        void queryClient.invalidateQueries({
          queryKey: ["/api/posts", slugParam, "onlyPublished=false"],
        });
      }
      toast.success("Đã cập nhật bài viết từ tài liệu.");
    },
    onError: (err: Error) => {
      toast.error("Không thể cập nhật bài viết.", err.message);
    },
  });

  function handleSyncSlugFromTitle(): void {
    if (title.trim()) {
      setSlug(slugify(title));
    }
  }

  function handleInsertImage(): void {
    const url = imageUrlInput.trim();
    if (!url) {
      toast.error("Vui lòng nhập URL ảnh.");
      return;
    }
    const alt = imageAltInput.trim();
    const html = `<figure><img src="${url.replace(/"/g, "&quot;")}" alt="${alt.replace(/"/g, "&quot;")}" /></figure>`;
    if (contentRef.current) {
      const newContent = insertAtCursor(contentRef.current, html);
      setContent(newContent);
    } else {
      setContent((prev) => prev + html);
    }
    setImageUrlInput("");
    setImageAltInput("");
    setImageDialogOpen(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmedImageUrl = imageUrl.trim() || null;
    const publishedAtValue = publishedAt ? `${publishedAt}T00:00:00.000Z` : new Date().toISOString();
    const isUsingDocumentUpload = postingMode === "upload";
    if (isUsingDocumentUpload) {
      if (!documentFile) {
        toast.error("Vui lòng chọn file Word/Docs.");
        return;
      }
      const formData = new FormData();
      formData.append("type", type);
      formData.append("publishedAt", publishedAtValue);
      formData.append("isPublished", String(isPublished));
      if (trimmedImageUrl) {
        formData.append("imageUrl", trimmedImageUrl);
      }
      formData.append("document", documentFile);
      if (isEdit) {
        if (!currentId) {
          toast.error("Đang tải bài viết, vui lòng đợi.");
          return;
        }
        updateFromDocumentMutation.mutate(formData);
      } else {
        createFromDocumentMutation.mutate(formData);
      }
      return;
    }
    const trimmedSlug = slug.trim();
    const trimmedTitle = title.trim();
    const trimmedSummary = summary.trim();
    if (!trimmedSlug || !trimmedTitle) {
      toast.error("Vui lòng điền đủ tiêu đề và slug.");
      return;
    }

    const payload: PostPayload = {
      slug: trimmedSlug,
      title: trimmedTitle,
      summary: trimmedSummary,
      content: content.trim(),
      imageUrl: trimmedImageUrl,
      type,
      publishedAt: publishedAtValue,
      isPublished,
    };
    if (!payload.content) {
      toast.error("Vui lòng điền đủ tiêu đề, slug, tóm tắt và nội dung.");
      return;
    }
    if (isEdit) {
      if (!currentId) {
        toast.error("Đang tải bài viết, vui lòng đợi.");
        return;
      }
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  }

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending ||
    createFromDocumentMutation.isPending ||
    updateFromDocumentMutation.isPending;

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">
            <Button variant="ghost" size="sm" className="rounded-full">
              ← Danh sách bài viết
            </Button>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-secondary">
            {isEdit ? "Chỉnh sửa bài viết" : "Đăng bài mới"}
          </h1>
        </div>

        {isEdit && isLoadingPost && <p className="text-muted-foreground">Đang tải bài viết...</p>}

        {isEdit && !isLoadingPost && (data?.post == null || isPostError) && (
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-destructive font-medium">
              {isPostError && postError?.message ? postError.message : "Không tìm thấy bài viết."}
            </p>
            <p className="text-sm text-muted-foreground">
              Nếu bài viết vừa bị xóa hoặc ID không đúng, quay lại danh sách. Nếu phiên đăng nhập hết hạn, đăng nhập lại rồi thử.
            </p>
            <div className="flex gap-3">
              <Link href="/admin/posts">
                <Button variant="outline" className="rounded-full">
                  Danh sách bài viết
                </Button>
              </Link>
              <Link href="/dang-nhap">
                <Button variant="ghost" className="rounded-full">
                  Đăng nhập lại
                </Button>
              </Link>
            </div>
          </div>
        )}

        {(!isEdit || data?.post) && (
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="grid gap-2">
              <Label>Phương thức đăng bài</Label>
              <div className="flex flex-wrap gap-4 text-sm">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="postingMode"
                    value="manual"
                    checked={postingMode === "manual"}
                    onChange={() => setPostingMode("manual")}
                  />
                  Nhập tay (truyền thống)
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="postingMode"
                    value="upload"
                    checked={postingMode === "upload"}
                    onChange={() => setPostingMode("upload")}
                  />
                  Upload file Word/Docs
                </label>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Loại bài</Label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as "NEWS" | "ANNOUNCEMENT")}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              >
                <option value="NEWS">Tin tức</option>
                <option value="ANNOUNCEMENT">Thông báo</option>
              </select>
            </div>

            {postingMode === "manual" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề bài viết"
                    className="rounded-lg"
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slug">Đường dẫn (slug)</Label>
                    <Button type="button" variant="ghost" size="sm" onClick={handleSyncSlugFromTitle}>
                      Tạo slug từ tiêu đề
                    </Button>
                  </div>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="duong-dan-bai-viet"
                    className="rounded-lg font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Dùng cho URL: /tin-tuc/{slug || "..."} hoặc /cong-bo-thong-tin/{slug || "..."}
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="summary">Tóm tắt</Label>
                  <textarea
                    id="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Đoạn tóm tắt hiển thị ở danh sách và đầu bài"
                    rows={3}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </>
            )}

            {postingMode === "manual" && (
              <div className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="content">Nội dung (HTML)</Label>
                  {documentFile != null && (
                    <span className="text-xs text-muted-foreground">(Tự tạo từ file)</span>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setImageDialogOpen(true)}
                  className="gap-1"
                >
                  <ImagePlus className="w-4 h-4" />
                  Chèn ảnh
                </Button>
              </div>
              <textarea
                ref={contentRef}
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="<p>Đoạn văn...</p>&#10;<figure><img src=&quot;URL_ẢNH&quot; alt=&quot;Mô tả&quot; /></figure>"
                rows={14}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <p className="text-xs text-muted-foreground">
                Dùng thẻ &lt;p&gt; cho đoạn văn, nút &quot;Chèn ảnh&quot; sẽ thêm &lt;figure&gt;&lt;img&gt;&lt;/figure&gt;. Có thể dán URL ảnh từ kho lưu trữ (ví dụ fs.vinachem.com.vn).
              </p>
            </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="document">Tài liệu Word/Docs (.docx) - Cách 2</Label>
              <div className="flex items-center gap-3">
                <Input
                  key={documentInputKey}
                  id="document"
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleDocumentFileChange}
                  className="rounded-lg"
                  disabled={isSubmitting}
                />
                {documentFile && (
                  <Button type="button" variant="outline" className="rounded-full" onClick={handleClearDocumentFile}>
                    Bỏ chọn
                  </Button>
                )}
              </div>
              {documentFile && <p className="text-xs text-muted-foreground">{documentFile.name}</p>}
              <p className="text-xs text-muted-foreground">
                Ở chế độ upload: hệ thống tự lấy dòng đầu tiên làm tiêu đề, tự sinh slug, tóm tắt để trống.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Ảnh đại diện (cho danh sách tin)</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="rounded-lg"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="publishedAt">Ngày đăng</Label>
              <Input
                id="publishedAt"
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="rounded-lg w-fit"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="isPublished"
                checked={isPublished}
                onCheckedChange={(checked) => setIsPublished(checked === true)}
              />
              <Label htmlFor="isPublished" className="cursor-pointer">
                Đăng ngay (hiển thị trên trang chủ / danh sách)
              </Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting} className="rounded-full">
                {isSubmitting ? "Đang lưu..." : isEdit ? "Cập nhật" : "Đăng bài"}
              </Button>
              <Link href="/admin/posts">
                <Button type="button" variant="outline" className="rounded-full">
                  Hủy
                </Button>
              </Link>
            </div>
          </form>
        )}
      </div>

      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chèn ảnh vào nội dung</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="imgUrl">URL ảnh</Label>
              <Input
                id="imgUrl"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imgAlt">Mô tả ảnh (alt)</Label>
              <Input
                id="imgAlt"
                value={imageAltInput}
                onChange={(e) => setImageAltInput(e.target.value)}
                placeholder="Tùy chọn"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setImageDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="button" onClick={handleInsertImage}>
              Chèn ảnh
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
