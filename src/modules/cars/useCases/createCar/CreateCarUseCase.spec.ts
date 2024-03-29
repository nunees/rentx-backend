import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "First Car",
      description: "car description",
      daily_rate: 100,
      license_plate: "ABC-5432",
      fine_amount: 80,
      brand: "Brand",
      category_id: "category",
    });
    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with the same license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "car description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 80,
        brand: "Brand",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "car description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 80,
        brand: "Brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should  be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car2",
      description: "car description",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 80,
      brand: "Brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
