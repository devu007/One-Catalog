import UploadImage from './uploadimage';
import { ModeToggle } from './mode-toggle';
import Pricing from './plans-page';

function Home() {
  return (
    <>
      <UploadImage />
      <ModeToggle />
      <Pricing />
    </>
  );
}

export default Home;
