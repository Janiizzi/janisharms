import { Helmet } from 'react-helmet-async';

const Colorscheme = () => {
  return (
    <div className="flex items-center justify-center">
      <Helmet>
        <title>Colorscheme – Janis Harms</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="flex flex-row gap-4">
        <div className="bg-primary w-32 h-32 flex items-center justify-center rounded">
          Box
        </div>
        <div className="bg-secondary w-32 h-32 flex items-center justify-center rounded">
          Box
        </div>
        <div className="bg-primary-white w-32 h-32 flex items-center justify-center rounded">
          Box
        </div>
        <div className="bg-primary-light w-32 h-32 flex items-center justify-center rounded">
          Box
        </div>


        <div className="border border-primary-light text-primary w-32 h-32 flex items-center justify-center rounded">
          Box
        </div>
        <div className="border border-primary-light text-primary-text w-32 h-32 flex items-center justify-center rounded">
          Box 
        </div>
        <div className="border border-primary-light text-primary-light w-32 h-32 flex items-center justify-center rounded">
          Box 
        </div>
      </div>
    </div>
  )
}

export default Colorscheme