import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { APIURLConstant } from "../../../common/apiURLConstant";
import { columnConstants } from "../../../common/columnsConstant";
import { DataGrid } from "../../../components/reusable/data-grid/DataGrid";
import APIHelper from "../../../helper/APIHelper";
import { setShowAlert } from "../../../store/alert";
import IncomeForm from "../components/IncomeForm";

const columns = columnConstants.incomeGridColumns;

const Income = () => {
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [gridData, setGridData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [editIncomeData, setEditIncomeData] = useState(null);

  useEffect(() => {
    getIncomeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIncomeList = async () => {
    setShowLoader(true);
    try {
      const { data } = await APIHelper.get(
        APIURLConstant.GET_INCOME_LIST(userId)
      );
      if (data && data.success) {
        setGridData(data.data.reverse());
        setShowLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (data) => {
    setEditIncomeData(data);
  };

  const onDelete = async (rowData) => {
    const id = rowData._id;
    try {
      const { data } = await APIHelper.delete(
        APIURLConstant.DELETE_INCOME_RECORD(id)
      );
      if (data && data.success) {
        getIncomeList();
        dispatch(
          setShowAlert({
            showAlert: true,
            variant: "success",
            message: data.message,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-4">
      {/* Filter and search and an add button */}
      <div className="mb-8">
        <IncomeForm
          getIncomeList={getIncomeList}
          editIncomeData={editIncomeData}
          resetEditIncomeData={() => setEditIncomeData(null)}
        />
      </div>
      {showLoader ? (
        <div className="absolute left-1/2 top-1/2 translate-x-1/2 translate-y-1/2">
          <BeatLoader color="#9D7AE8" />
        </div>
      ) : (
        <div className="max-h-[50vh] overflow-y-scroll">
          {gridData.length === 0 ? (
            <p className="w-full text-center text-primary">Add data to view</p>
          ) : (
            <DataGrid
              gridData={gridData}
              gridColumns={columns}
              actions
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Income;
