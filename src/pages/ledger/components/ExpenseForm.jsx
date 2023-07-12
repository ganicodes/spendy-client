import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { APIURLConstant } from "../../../common/apiURLConstant";
import Input from "../../../components/reusable/Input";
import Button from "../../../components/reusable/PrimaryButton";
import Select from "../../../components/reusable/Select";
import APIHelper from "../../../helper/APIHelper";
import { setShowAlert } from "../../../store/alert";

const ExpenseForm = ({
  getExpenseList,
  editExpenseData,
  resetEditExpenseData,
}) => {
  const theme = useSelector((state) => state.theme.theme);
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const [date, setDate] = useState(new Date());
  const [date, setDate] = useState(null);
  const [expenseConfig, setExpenseConfig] = useState([]);
  const [expenseCategoryOptions, setExpenseCategoryOptions] = useState([]);
  const [expenseTypeOptions, setExpenseTypeOptions] = useState([]);
  const [activeType, setActiveType] = useState(-1);

  useEffect(() => {
    // populating expense type dropdown values
    getExpenseTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // populating expense categories on the basis of selected expense type
    if (activeType !== -1) {
      let temp = expenseConfig.expenseTypes[activeType];
      setExpenseCategoryOptions(
        temp.map((item) => ({
          label: item,
        }))
      );
    }
  }, [activeType, expenseConfig]);

  useEffect(() => {
    // resetting while editing records
    if (editExpenseData) {
      setDate(new Date(editExpenseData.date));
      setActiveType(editExpenseData.type);

      reset({
        amount: editExpenseData.amount,
        description: editExpenseData.description,
        expenseType: editExpenseData.type,
        expenseCategory: editExpenseData.category,
      });
    }
  }, [editExpenseData, expenseConfig.expenseTypes, reset]);

  const getExpenseTypes = async () => {
    // functing that will get the config from DB and filter the data to our use
    try {
      const { data } = await APIHelper.get(
        APIURLConstant.GET_EXPENSE_TYPES(userId)
      );
      let newTypesArr = [];
      if (data.success) {
        setExpenseConfig(data.data.find((item) => item.userId === userId));

        newTypesArr = Object.keys(
          data.data.find((item) => item.userId === userId).expenseTypes
        );

        // populating options in Expense Type dropdown
        setExpenseTypeOptions(
          newTypesArr.map((item) => ({
            label: item,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddExpense = (data) => {
    if (!date) {
      dispatch(
        setShowAlert({
          showAlert: true,
          variant: "warning",
          message: "Date can not be left empty!",
        })
      );

      return;
    }

    const obj = {
      date: date,
      amount: data.amount,
      type: data.expenseType,
      category: data.expenseCategory,
      description: data.description,
      userId: userId,
    };

    insertExpenseRecord(obj);
  };

  const insertExpenseRecord = async (obj) => {
    let id = editExpenseData ? editExpenseData._id : 0;

    try {
      let response = null;
      // if id != 0 -> editing
      if (id === 0) {
        let { data } = await APIHelper.post(
          APIURLConstant.INSERT_EXPENSE_RECORD,
          obj
        );
        response = data;
      } else {
        let { data } = await APIHelper.put(
          APIURLConstant.EDIT_EXPENSE_RECORD(id),
          obj
        );
        response = data;
      }

      if (response && response.success) {
        dispatch(
          setShowAlert({
            showAlert: true,
            variant: "success",
            message: response.message,
          })
        );
        getExpenseList();
        reset({
          amount: "",
          description: "",
          expenseType: "",
          expenseCategory: "",
        });
        setDate(null);
        resetEditExpenseData(); //resetting the object to be edited
      } else {
        dispatch(
          setShowAlert({
            showAlert: true,
            variant: "error",
            message: response.message,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="mt-4 flex flex-wrap gap-y-2 md:grid md:grid-flow-col md:gap-x-1.5">
      <div
        className={`basis-1/2 ${
          theme === "light" ? "calendar-light" : "calendar-dark"
        }`}
      >
        <DatePicker
          showPopperArrow={false}
          selected={date}
          onChange={(date) => {
            setDate(date);
          }}
          maxDate={new Date()}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          placeholderText="Click to select a date"
          dropdownMode="select"
          dateFormat="dd/MM/yyyy"
          className="h-[40px] w-[100%] rounded border border-primary px-2 py-1 outline-primary dark:bg-gray-700"
        />
      </div>
      <div className="basis-1/2">
        <Input
          type="number"
          placeholder={"Enter Amount"}
          name="amount"
          register={register}
          required
          onInputChange={(e) => console.log(e.target.value)}
        />
        {errors.amount && <span className="text-rose-700">Required</span>}
      </div>
      <div className="basis-1/2">
        <Select
          placeholder="Please select type"
          options={expenseTypeOptions}
          name="expenseType"
          required
          onSelect={(e) => setActiveType(e.target.value)}
          register={register}
        />
        {errors.expenseType && <span className="text-rose-700">Required</span>}
      </div>
      <div className="basis-1/2">
        <Select
          placeholder="Please select category"
          options={expenseCategoryOptions}
          name="expenseCategory"
          required
          register={register}
        />
        {errors.expenseCategory && (
          <span className="text-rose-700">Required</span>
        )}
      </div>
      <div className="basis-full">
        <Input
          type="text"
          name="description"
          placeholder={"Enter Description"}
          register={register}
          onInputChange={(e) => console.log(e.target.value)}
        />
      </div>
      <div className="relative right-0 basis-full">
        <Button
          title={editExpenseData ? "Edit Expense" : "Add Expense"}
          onClick={handleSubmit(handleAddExpense)}
        />
      </div>
    </form>
  );
};

ExpenseForm.propTypes = {
  getExpenseList: PropTypes.func,
  resetEditExpenseData: PropTypes.func,
  editExpenseData: PropTypes.object,
};

export default ExpenseForm;
