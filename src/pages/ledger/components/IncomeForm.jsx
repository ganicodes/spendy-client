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

const IncomeForm = ({ getIncomeList, editIncomeData, resetEditIncomeData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { theme } = useSelector((state) => state.theme);
  const { userId } = useSelector((state) => state.user);

  // const [date, setDate] = useState(new Date());
  const [date, setDate] = useState(null);
  const [incomeSourceOptions, setIncomeSourceOptions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getIncomeSource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // resetting while editing records
    if (editIncomeData) {
      setDate(new Date(editIncomeData.date));

      reset({
        amount: editIncomeData.amount,
        description: editIncomeData.description,
        source: editIncomeData.source,
      });
    }
  }, [editIncomeData, reset]);

  const getIncomeSource = async () => {
    try {
      let { data } = await APIHelper.get(
        APIURLConstant.GET_INCOME_TYPES(userId)
      );
      let incomeTypesArray = [];
      if (data.success) {
        incomeTypesArray = data.data[0].incomeTypes;
        setIncomeSourceOptions(
          incomeTypesArray.map((item, index) => ({
            label: item,
            value: index,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddIncome = (data) => {
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
      source: data.source,
      description: data.description,
      userId: userId,
    };

    insertIncomeRecord(obj);
  };

  const insertIncomeRecord = async (obj) => {
    let id = editIncomeData ? editIncomeData._id : 0;
    try {
      let response = null;
      if (id === 0) {
        const { data } = await APIHelper.post(
          APIURLConstant.INSERT_INCOME_RECORD,
          obj
        );
        response = data;
      } else {
        const { data } = await APIHelper.put(
          APIURLConstant.EDIT_INCOME_RECORD(id),
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
        getIncomeList();
        reset({
          amount: "",
          description: "",
          source: "",
        });
        setDate(null);
        resetEditIncomeData();
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
          required
          onInputChange={(e) => console.log(e.target.value)}
          register={register}
        />
        {errors.amount && <span className="text-rose-700">Required</span>}
      </div>
      <div className="basis-1/2">
        <Select
          placeholder="Please select source"
          name="source"
          options={incomeSourceOptions}
          register={register}
          required
        />
        {errors.source && <span className="text-rose-700">Required</span>}
      </div>
      <div className="basis-1/2">
        <Input
          type="text"
          placeholder={"Enter Description"}
          name="description"
          onInputChange={(e) => console.log(e.target.value)}
          register={register}
        />
        {errors.description && <span className="text-rose-700">Required</span>}
      </div>
      <div className="relative right-0 basis-full">
        <Button
          title={editIncomeData ? "Update Income" : "Add Income"}
          onClick={handleSubmit(handleAddIncome)}
        />
      </div>
    </form>
  );
};

IncomeForm.propTypes = {
  getIncomeList: PropTypes.func,
  resetEditIncomeData: PropTypes.func,
  editIncomeData: PropTypes.object,
};
export default IncomeForm;
