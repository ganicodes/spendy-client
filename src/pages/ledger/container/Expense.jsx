import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { APIURLConstant } from "../../../common/apiURLConstant";
import { columnConstants } from "../../../common/columnsConstant";
import { DataGrid } from "../../../components/reusable/data-grid/DataGrid";
import APIHelper from "../../../helper/APIHelper";
import { setShowAlert } from "../../../store/alert";
import ExpenseForm from "../components/ExpenseForm";

const columns = columnConstants.expenseGridColumns;

const Expense = () => {
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [gridData, setGridData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [editExpenseData, setEditExpenseData] = useState(null);

  useEffect(() => {
    getExpenseList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getExpenseList = async () => {
    setShowLoader(true);
    try {
      const { data } = await APIHelper.get(
        APIURLConstant.GET_EXPENSE_LIST(userId)
      );
      if (data.success) {
        setGridData(data.data.reverse());
        setShowLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (data) => {
    setEditExpenseData(data);
  };

  const onDelete = async (rowData) => {
    const id = rowData._id;
    const { data } = await APIHelper.delete(
      APIURLConstant.DELETE_EXPENSE_RECORD(id)
    );
    if (data && data.success) {
      getExpenseList();
      dispatch(
        setShowAlert({
          showAlert: true,
          variant: "success",
          message: data.message,
        })
      );
    }
  };

  return (
    <div className="mx-4">
      <div className="mb-8">
        <ExpenseForm
          getExpenseList={getExpenseList}
          editExpenseData={editExpenseData}
          resetEditExpenseData={() => setEditExpenseData(null)}
        />
      </div>
      {showLoader ? (
        <div className="absolute left-1/2 top-1/2 translate-x-1/2 translate-y-1/2">
          <BeatLoader color="#9D7AE8" />
        </div>
      ) : (
        <div className="max-h-[50vh] overflow-y-scroll">
          {gridData.length === 0 ? (
            <p className="w-full text-center text-primary">
              No records to display
            </p>
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

export default Expense;
