import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://youtube-connector-mcp-website.vercel.app";

  return [
    {
      url: baseUrl,
      // 使用当前日期，告诉 Google 这是一个活跃更新的项目
      lastModified: new Date(),
      // 改为 weekly，吸引爬虫更频繁地光顾
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
