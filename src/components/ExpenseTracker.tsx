import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// const copyValues=[]
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be atleast 3 characters." }),
  amount: z
    .number({
      invalid_type_error: "Amount is required",
    })
    .positive(),
  category: z.string().min(1, { message: "Category is required." }),
});
type formData = z.infer<typeof schema>;
const ExpenseTracker = () => {
  const [values, setValues] = useState([] as FieldValues[]);
  const [cate, setCate] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FieldValues) => {
    const newValues = [...values, data];
    setValues(newValues);
  };
  const handleDelete = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
  };
  // Category filter logic we are getting values from state
  let filteredValues = values
   if (cate!==""){ 
        filteredValues=filteredValues.filter((value)=>{
          return value.category===cate})
   }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          {...register("category", { required: true })}
          id="category"
          className="form-select form-select mb-3"
          aria-label=".form-select-lg example"
        >
          <option disabled selected value={""}>
            --select--
          </option>
          <option>Groceries</option>
          <option>Utility</option>
          <option>Entertainment</option>
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>

      <div>
        <label htmlFor="all-category" className="form-label"></label>
        <select
          id="all-category"
          className="form-select form-select mb-3"
          aria-label=".form-select-lg example"
          onChange={(event)=> {
            setCate(event.target.value)
           }
          }
        >
          <option selected value={""}> 
            All categories
          </option>
          <option id="1">Groceries</option>
          <option id="2">Utility</option>
          <option id="3">Entertainment</option>
        </select>
      </div>
      <table className="table table-bordered w-auto">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredValues.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.amount + "$"}</td>
              <td>{item.category}</td>
              <td>
                <button
                  onClick={() => handleDelete(index)}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default ExpenseTracker;
