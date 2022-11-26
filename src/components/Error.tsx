import { FC } from "react"

interface Props{
    msg: string;
}

export const Error:FC<Props> = ({msg}) => {
  return (
    <div className='bg-red-800 text-white text-center p-2 uppercase font-bold mb-3 rounded-md'>
                <p>{msg}</p>
    </div>
  )
}
