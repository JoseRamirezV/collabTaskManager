import { AiOutlineLoading } from 'react-icons/ai';

interface Props {
  className?: string;
}

export default function LoadingIcon({ className }: Props) {
  return (
    <span className='block'>
      <AiOutlineLoading className={`${className} mx-auto animate-spin`} />
    </span>
  );
}
