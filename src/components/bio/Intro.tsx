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

      <p className='text-sm mb-8'>
        Hello I'm Lee. A freelance Front End Developer based in Dorset.
        <br />
        <br />
        I specialise in Angular, but I have full stack experience with a range
        of different technologies for creating modern applications.
        <br />
        <br />I am fortunate to work in a field I am passionate about,
        programming is a job and a hobby.
      </p>

      <h2 className='text-deep-gray'>Coding Philosophies</h2>
      <ul className='list-disc text-left ml-4'>
        <li>
          <b>I Always try to learn new skills:</b> Dont get stuck in old
          patterns/ ways of thinking.
        </li>
        <li>
          <b>I try to Keep up to date with new technologies and innovations</b>:
          Creating feature rich applications is becoming faster and easier than
          ever before.
        </li>
        <li>
          <b>I Prioritise code readability:</b> It may be the the most important
          coding standard in my opinion.
        </li>
      </ul>
    </div>
  );
};

export default Intro;
