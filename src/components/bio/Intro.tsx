import { useEffect, useMemo } from 'react';
import Image from 'next/image';

/**
 * Calculates the approximate age in years for the provided
 * birthday, not accurate for time zone boundries
 * @param birthday
 * @returns
 */
const calculateApproximateAge = (birthday: Date): number => {
  var ageInMilliseconds = Date.now() - birthday.getTime();
  const ageFromEpoch = new Date(ageInMilliseconds);
  return Math.abs(ageFromEpoch.getUTCFullYear() - 1970);
};

const ImageSize = 220;

const Intro: React.FunctionComponent = () => {
  const age = useMemo(() => {
    return calculateApproximateAge(new Date(1993, 0, 28));
  }, []);

  return (
    <div className='text-center flex flex-col items-center gap-8'>
      <Image
        id='image'
        width={ImageSize}
        height={ImageSize}
        className=' rounded-full'
        src='/bio/me.jpg'
        alt='Picture of Lee Sherwood'
      />

      <div
        className='
                whitespace-nowrap
                w-60
                h-8
                relative
                word-rotate
                text-lg
              '
      >
        <span className='absolute inset-0 animate-wordRotate'>
          <b>Name:</b>
          <span> Lee Sherwood </span>
        </span>
        <span className='absolute inset-0 animate-wordRotate opacity-0'>
          <b>Age:</b>
          <span>{age}</span>
        </span>
        <span className='absolute inset-0 animate-wordRotate opacity-0'>
          <b>Role:</b>
          <span className=''> Web Developer </span>
        </span>
      </div>

      <h2 className='text-deep-gray'>About Me</h2>
    </div>
  );
};

export default Intro;
