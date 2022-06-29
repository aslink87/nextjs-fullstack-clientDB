import Head from 'next/head';
import Navigation from '../../navigation/Navigation';

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start';
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({
  children,
  justify = 'items-center',
  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>NextJs Fullstack App Template</title>
      </Head>
      <div {...divProps} className={`min-h-screen bg-blue-400 flex flex-col ${justify}`}>
        <Navigation />
        <main className="pt-4 w-full">{children}</main>
      </div>
    </>
  );
};

export default PrimaryLayout;
