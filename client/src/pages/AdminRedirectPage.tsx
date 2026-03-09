import { useEffect } from "react";
import { useLocation } from "wouter";

export default function AdminRedirectPage() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/admin/posts");
  }, [setLocation]);
  return null;
}
