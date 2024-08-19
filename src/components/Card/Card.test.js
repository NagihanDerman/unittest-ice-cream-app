import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";

const item = {
  name: "Chocolate",
  imagePath: "/images/chocolate.png",
  id: "bcf1",
};

// Prop olarak veri alan bir bileşeni test ediyorsak bileşenin aldığı propları göndermemiz gerekir
test("Miktar, başlık ve fotoğraf gelen propa göre ekrana basılır", () => {
  render(
    <Card
      item={item}
      amount={5}
      addToBasket={() => {}}
      clearFromBasket={() => {}}
    />
  );

  // miktar spanını çağır
  const amount = screen.getByTestId("amount");

  // span içeriği 5 mi kontrol et
  expect(amount.textContent).toBe("5");

  // chocalate yazısı ekrana geldi mi kontrol et
  // getBy elementi bulamazsa hata fırlatır
  screen.getByText("Chocolate");

  // resim elementini çağır
  const img = screen.getByAltText("çeşit-resim");

  // resmin kaynağı doğru mu kontrol et
  expect(img).toHaveAttribute("src", "/images/chocolate.png");
});

test("Butonlara tıklanınca fonksiyonlar doğru parametrelerle çağrılır", async () => {
  const user = userEvent.setup();

  const addMockFn = jest.fn();
  const clearMockFn = jest.fn();

  render(
    <Card
      item={item}
      amount={3}
      addToBasket={addMockFn}
      clearFromBasket={clearMockFn}
    />
  );

  // butonları al
  const addBtn = screen.getByRole("button", { name: /ekle/i });
  const clearBtn = screen.getByRole("button", { name: /sıfırla/i });

  // ekle butonuna tıkla
  await user.click(addBtn);

  // addToBasket methodu doğru parametrelerle çağrıldı mı
  expect(addMockFn).toHaveBeenCalledWith(item);

  // sıfırla butonuna tıkla
  await user.click(clearBtn);

  // clearFromBasket methodu doğru parametrelerle çağrıldı mı
  expect(clearMockFn).toHaveBeenCalledWith(item.id);
});
