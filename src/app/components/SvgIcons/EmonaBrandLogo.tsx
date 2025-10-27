import React from 'react'
import Image from 'next/image'

const EmonaBrandLogo = () => {
  return (
    <div className='pt-4'>
      <Image
        src="/assets/logo-emona.png"
        alt="Emona Logo"
        width={70}
        height={70}
        priority
      />
    </div>
  )
}

export default EmonaBrandLogo