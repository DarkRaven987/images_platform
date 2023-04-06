import AddImage from './components/AddImage/AddImage';
import Header from './components/Header/Header';
import ImagesList from './components/ImagesList/ImagesList';
import './Dashboard.css';

const DashboardView = () => {
  return (
    <div className="page-container">
      <Header title="Images platform" />

      <AddImage />

      <ImagesList />
    </div>
  );
};

export default DashboardView;
