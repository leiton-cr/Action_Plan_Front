import HeaderForm from './components/HeaderForm/HeaderForm';
import Table from './components/Table/Table';

import useDetails from './useDetails';

const DetailsPage = () => {
  
  const {changes, headerData, detailsState, formState, handleSave, handleCancel} = useDetails();

  return (
    <div>

      <HeaderForm formState={formState}></HeaderForm>

      <Table headerData={headerData} detailsState={detailsState} filters={false}></Table>

      <section className='details__footer'>
      
        <div className={changes ? "": "transparent"}>Changes pending to be saved.</div>
      
        <div className='details__buttons'>
          <button  onClick={handleCancel}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </section>

    </div>
  )
}

export default DetailsPage