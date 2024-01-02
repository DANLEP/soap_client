import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import AttractionList from "@/components/AttractionList.client";


export default async function Home() {
  return (
      <Wrapper>
          <Header/>
          <AttractionList/>
      </Wrapper>
  )
}
