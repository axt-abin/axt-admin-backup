interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6 text-primary'
          >
            <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10' />
          </svg>
          <h1 className='text-xl font-medium text-primary'>AxiTrust</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
