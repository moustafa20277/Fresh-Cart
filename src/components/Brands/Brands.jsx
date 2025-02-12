import { useState } from "react";
import useFetch from "../../hooks/useFetch"
import Lodear from '../Lodear/Lodear'
import { Helmet } from 'react-helmet-async';




export default function Brands() {
  const [page, setPage] = useState(null)
  const { error, loading, list } = useFetch(`https://ecommerce.routemisr.com/api/v1/brands`, page)

  function changePage(e) {
    setPage(e.target.value);
  }
  function Page(currentpage) {
    if (currentpage < list.metadata.numberOfPages) {
      setPage(currentpage);
    } else {
      setPage(list.metadata.currentpage);
    }
  }


  return (
    <div className='mt-6'>
      {error ? <div class="p-8 my-32 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
        <p className='text-center text-2xl'>{error}</p>
      </div> :
        <>
          {loading ? <div className='my-48 relative'>
            <Lodear />
          </div> : <div className='flex flex-wrap'>
            {list?.data?.map((data) =>
              <>
                <Helmet>
                  <title>Brands | Fresh-Cart</title>
                  <meta name="keywords" content={data.slug} />
                </Helmet>
                <div onClick={(() => Related(data._id))} className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 px-1 mb-4 cursor-pointer" key={data._id}>
                  <div className=" group border hover:shadow-md hover:shadow-green-500 rounded-t-lg hover:duration-transitionDuration">
                    <div className="cursor-pointer">
                      <figure>
                        <img className="rounded-t-lg h-80 w-full" src={data.image} alt={data.name} />
                      </figure>
                      <figcaption className="px-2 pt-4">
                        <h5 className=" text-main mb-2 text-center text-xl">{data.name}</h5>
                      </figcaption>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>}
          <ul className='flex justify-center space-x-6 text-white my-4'>
            <li onClick={() => Page(list.metadata.currentPage - 1)} className='bg-main p-2 rounded-3xl cursor-pointer'><i class="fa-solid fa-chevron-left"></i></li>
            <li onClick={changePage} value='1' className='bg-main p-2 rounded-3xl cursor-pointer'>1</li>
            <li onClick={changePage} value='2' className='bg-main p-2 rounded-3xl cursor-pointer'>2</li>
            <li onClick={() => Page(list.metadata.currentPage + 1)} className='bg-main p-2 rounded-3xl cursor-pointer'><i class="fa-solid fa-chevron-right"></i></li>
          </ul>
        </>
      }
    </div>
  )
}