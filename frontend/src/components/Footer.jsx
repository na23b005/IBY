import React from 'react'

const Footer = () => {
  return (
    <div><footer className=" text-white py-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Intellix. All rights reserved.
        </p>
      </footer></div>
  )
}

export default Footer