import Layout from "@/components/App/Main/Layout";
import Blog from "@/components/Blog/Blog";

const BlogPage = () => {
  return (
    <Layout>
      <div className="grid p-6 gap-3 lg:grid-cols-3 text-white w-full overflow-y-auto h-[calc(100%-5rem)] scrollbar-hide">
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
      </div>
    </Layout>
  );
};

export default BlogPage;
