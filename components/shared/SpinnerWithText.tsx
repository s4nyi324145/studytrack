import React from 'react'

const SpinnerWithText = ({message}: {message:string}) => {
  return (
    <div className="flex  items-center justify-center gap-4">
        <div className="w-7 h-7 border-3 border-t-transparent border-primary-foreground rounded-full animate-spin"></div>
        <p className="text-sm text-primary-foreground">{message}</p>
    </div>
  )
}

export default SpinnerWithText
