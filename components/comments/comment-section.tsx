import { useEffect, useState } from "react";
import { Comment } from "../../types/database";
import { Textarea } from "../ui/textarea";

export default function CommentSection({ productId }: { productId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");

  const customerId = 2;

  // Lấy danh sách bình luận
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?productId=${productId}`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [productId]);

  // Gửi bình luận mới
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (!customerId) {
      alert("Bạn cần đăng nhập để bình luận.");
      return;
    }

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, customerId, content }),
      });

      if (!response.ok) throw new Error("Failed to post comment");

      const newComment = await response.json();

      // Cập nhật danh sách comment mà không cần load lại trang
      setComments((prevComments) => [newComment, ...prevComments]);

      setContent(""); // Xóa nội dung trong ô nhập bình luận
    } catch (error) {
      console.error(error);
      alert("Gửi bình luận thất bại, vui lòng thử lại.");
    }

    fetch(`/api/comments?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  return (
    <div className="w-full rounded-lg border bg-white p-4">
      <h2 className="text-lg font-semibold">Bình luận</h2>

      <form onSubmit={handleSubmit} className="flex">
        <Textarea
          className="w-full rounded border p-1"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập bình luận của bạn..."
        ></Textarea>
        <button
          type="submit"
          className="ml-2 rounded bg-blue-500 px-4 text-white"
          disabled={!customerId}
        >
          Gửi
        </button>
      </form>

      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div
            key={comment.CommentID || `comment-${index}`}
            className="border-b p-2"
          >
            <p className="text-sm text-gray-700">
              <strong>{comment.FullName}</strong> ({comment.CreatedAt}):
            </p>
            <p className="text-gray-900">{comment.Content}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Chưa có bình luận nào.</p>
      )}
    </div>
  );
}
