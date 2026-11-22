import { Link } from "@/components/site-controls";

export default function NotFound() {
  return (
    <main className="shell page">
      <h1>页面不存在</h1>
      <Link href="/">回首页</Link>
    </main>
  );
}
