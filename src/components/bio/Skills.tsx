import Image from 'next/image';

const Skills: React.FunctionComponent = () => {
  return (
    <div className='text-center flex flex-col items-center gap-2'>
      <h2>Web Technologies</h2>
      <p data-scroll-reveal className='text-sm'>
        I have good experience with the following web technologies:
      </p>
      <SkillChipCollection>
        <SkillChip text='Angular' asset='angular.svg' />
        <SkillChip text='Typescript' asset='typescript.svg' />
        <SkillChip text='Akita' asset='akita.svg' />
        <SkillChip text='NGXS' asset='ngxs.png' />
        <SkillChip text='D3' asset='d3.svg' />
        <SkillChip text='Ionic' asset='ionic.svg' />
        <SkillChip text='Capacitor' asset='capacitor.png' />
        <SkillChip text='SASS' asset='sass.svg' />
        <SkillChip text='Tailwind' asset='tailwind.svg' />
        <SkillChip text='Webpack' asset='webpack.svg' />
        <SkillChip text='Parcel' asset='parcel.png' />
        <SkillChip text='Leaflet' asset='leaflet.svg' />
        <SkillChip text='NodeJS' asset='nodejs.png' />
        <SkillChip text='NX' asset='nx.png' />
      </SkillChipCollection>
    </div>
  );
};

interface SkillChipCollectionParams {
  children?: React.ReactNode;
}

const SkillChipCollection: React.FunctionComponent<
  SkillChipCollectionParams
> = ({ children }) => {
  return (
    <div className='grid grid-cols-2 gap-4 self-stretch place-items-center'>
      {children}
    </div>
  );
};

interface SkillShipParams {
  text: string;
  asset: string;
}
const SkillChip: React.FunctionComponent<SkillShipParams> = ({
  text,
  asset: assetPath,
}) => {
  return (
    <div className='flex items-center bg-white text-black rounded-full px-2'>
      <Image
        height={16}
        width={16}
        layout='fixed'
        className='w-4 h-4 mr-2'
        src={'/icons/' + assetPath}
      />
      {text}
    </div>
  );
};

export default Skills;
