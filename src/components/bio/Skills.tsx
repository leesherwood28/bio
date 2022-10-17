import Image from 'next/image';

const Skills: React.FunctionComponent = () => {
  return (
    <div className='text-center flex flex-col items-center gap-2'>
      <h2 className='text-lg'>Web Technologies</h2>
      <p>I have good experience with the following web technologies:</p>
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
      <h2 className='text-lg'>Backend Technologies</h2>
      <p>I have good experience with the following backend technologies:</p>
      <SkillChipCollection>
        <SkillChip text='Firebase' asset='firebase.svg' />
        <SkillChip text='.NET Core' asset='netcore.svg' />
        <SkillChip text='.NET Framework' asset='netframework.svg' />
        <SkillChip text='SQL Server' asset='sqlserver.png' />
      </SkillChipCollection>
      <h2 className='text-lg'>Tools and Services</h2>
      <p>I also have good experience with the following tools and services:</p>
      <SkillChipCollection>
        <SkillChip text='Git' asset='git.svg' />
        <SkillChip text='Azure' asset='azure.svg' />
        <SkillChip text='Azure Devops' asset='azure-devops.svg' />
        <SkillChip text='Github' asset='github.png' />
        <SkillChip text='Gitlab' asset='gitlab.svg' />
        <SkillChip text='npm' asset='npm.svg' />
      </SkillChipCollection>
      <h2>Practices</h2>
      <p>I have experience with the following practises:</p>
      <ul>
        <li>Object Oriented Programming</li>
        <li>Functional Programming</li>
        <li>Unit Testing</li>
        <li>Agile</li>
        <li>Scrum</li>
        <li>SAFE</li>
      </ul>
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
        src={'/icons/' + assetPath}
      />
      <span className='ml-1'>{text}</span>
    </div>
  );
};

export default Skills;
