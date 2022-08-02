import React from "react";
import useTranslation from "next-translate/useTranslation";
import MainLayout from "../../components/layouts/MainLayout";


const BlogPage: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <MainLayout title={t("titleBlog")}>
      Blog in development


    </MainLayout>
  );
};

export default BlogPage;
