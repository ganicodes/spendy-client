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

const ExpenseForm = ({ getExpenseList }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const theme = useSelector((state) => state.theme.theme);
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  // const [date, setDate] = useState(null);
  const [expenseConfig, setExpenseConfig] = useState([]);
  const [expenseCategoryOptions, setExpenseCategoryOptions] = useState([]);
  const [expenseTypeOptions, setExpenseTypeOptions] = useState([]);
  const [activeType, setActiveType] = useState(-1);

  useEffect(() => {
    // populating expense type on mounting
    getExpenseTypes();
  }, []);

  useEffect(() => {
    if (activeType !== -1) {
      let temp = expenseConfig.expenseTypes[activeType];
      setExpenseCategoryOptions(
        temp.map((item, index) => ({
          label: item,
          value: index,
        }))
      );
    }
  }, [activeType, expenseConfig]);

  const getExpenseTypes = async () => {
    // functing that will get the config from DB and filter the data to our use
    try {
      const { data } = await APIHelper.get(
        APIURLConstant.GET_EXPENSE_TYPES(userId)
      );
      let newTypesArr = [];
      if (data.success) {
        //saving data in local state so that it can be used later
        setExpenseConfig(data.data.find((item) => item.userId === userId));

        newTypesArr = Object.keys(
          data.data.find((item) => item.userId === userId).expenseTypes
        );

        setExpenseTypeOptions(
          newTypesArr.map((item, index) => ({
            label: item,
            value: index,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleOnBlur = ({ target: { value } }) => {
  //   const date = new Date(value);
  //   if (!isValidDate(date)) {
  //     dispatch(
  //       setShowAlert({
  //         showAlert: true,
  //         variant: "warning",
  //         message: "Invalid date! Please check again!",
  //       })
  //     );
  //   }
  // };

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
    // need to make POST API call here to save data into the grid

    try {
      let { data } = await APIHelper.post(
        APIURLConstant.INSERT_EXPENSE_RECORD,
        obj
      );

      if (data && data.success) {
        dispatch(
          setShowAlert({
            showAlert: true,
            variant: "success",
            message: data.message,
          })
        );
        getExpenseList();
        reset();
        setDate(new Date());
      } else {
        dispatch(
          setShowAlert({
            showAlert: true,
            variant: "error",
            message: data.message,
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
          // onBlur={handleOnBlur}
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
          title={"Add Expense"}
          onClick={handleSubmit(handleAddExpense)}
        />
      </div>
    </form>
  );
};

ExpenseForm.propTypes = {
  getExpenseList: PropTypes.func,
};

export default ExpenseForm;
