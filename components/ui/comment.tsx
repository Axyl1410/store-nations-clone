import axios from "@/lib/axios";
import { Comment } from "@/types";
import { getCookie } from "cookies-next";
import { formatDistanceToNow } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";
import { Textarea } from "./textarea";

interface CommentSectionProps {
  productID: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  productID,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [visibleComments, setVisibleComments] = useState<number>(5);
  const userIDCookie = getCookie("idUser");
  const fullName = getCookie("fullname");

  const userID = parseInt(userIDCookie as string);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/comments?productId=${productID}`);
      setComments(res.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [productID]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await axios.post("/api/comments", {
        productID: productID,
        customerID: userID,
        content: commentText,
        fullname: fullName,
      });
      setCommentText("");
      await fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Customer Reviews</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          // Loading skeleton UI
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-3 rounded-md border p-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))
        ) : comments.length > 0 ? (
          <>
            <div className="space-y-4">
              {comments.slice(0, visibleComments).map((comment) => (
                <div
                  key={comment.CommentID}
                  className="flex gap-3 rounded-md border p-3"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{comment.FullName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{comment.FullName}</p>
                      {comment.CreatedAt && (
                        <p className="text-muted-foreground text-xs">
                          {formatDistanceToNow(new Date(comment.CreatedAt), {
                            addSuffix: true,
                          })}
                        </p>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {comment.Content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {comments.length > visibleComments && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  onClick={loadMoreComments}
                  className="w-full sm:w-auto"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        ) : (
          <p className="text-muted-foreground py-6 text-center">
            No reviews yet. Be the first to leave a review!
          </p>
        )}
      </CardContent>

      <Separator className="my-2" />

      <CardFooter className="flex flex-col space-y-4 pt-4">
        <h3 className="text-lg font-medium">Add a review</h3>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Textarea
            placeholder="Write your review here..."
            className="min-h-[120px]"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isSubmitting || !commentText.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Review"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
