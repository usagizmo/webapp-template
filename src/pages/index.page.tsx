import React, { VFC } from 'react'
import ArticleList from '../components/Article/ArticleList'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import CONST from '../constants/const'

interface Props {}

const HomePage: VFC<Props> = () => {
  return (
    <Layout>
      <header className="u-flex-center h-[80px]">
        <h1 className="text-[24px] font-bold">{CONST.SITE_NAME}</h1>
      </header>
      <div className="container max-w-[480px]">
        <Navigation />

        <div className="mt-[24px]">
          <ArticleList />
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
