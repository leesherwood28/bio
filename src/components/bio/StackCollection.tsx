interface StackCollectionParams {
  children: React.ReactNode;
}
const StackCollection: React.FunctionComponent<StackCollectionParams> = ({
  children,
}) => {
  return (
    <div className='flex flex-wrap mb-8 justify-center gap-4'>{children}</div>
  );
};

export default StackCollection;
