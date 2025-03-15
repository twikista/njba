import Spinner from '@/components/shared/Spinner';
import { cn } from '@/lib/utils';

function SubmitButton({ mainText, altText, isSubmitting, className }) {
  return (
    <button
      type='submit'
      disabled={isSubmitting}
      className={cn('btn btn-primary', className)}
    >
      {isSubmitting ? (
        <Spinner text={altText} />
      ) : (
        <span className=''>{mainText}</span>
      )}
    </button>
  );
}

export default SubmitButton;
