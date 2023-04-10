
# Cubism


Cubism is an HTML Canvas based UI framework. It provides more consistency across different broswers.

You can try the online demo [here](https://nannoda.github.io/cubism/).


## Example
### Basic Layout
![image](https://user-images.githubusercontent.com/114621472/195958866-5153fdfb-32ef-4474-bc40-f58f886ef7b9.png)

Code:
```typescript
/**
 * Demo of a simple layout
 */
let app = Cubism.createFromId("mainCanvas");

app.init(
  new PointerHandlerParentElement(
    "PointerHandlerParentElement",
    new Background()
        .setColor(Colors.blue700),
    new VerticalLayout(
      "Outer Vertical Layout",
      new RectElement()
          .setWidth(100)
          .setHeight(100),
      new CircleElement()
          .setWidth(100)
          .setHeight(100),
      new HorizontalLayout(
        "Inner Horizontal Layout",
        new RectElement()
            .setWidth(100)
            .setHeight(100),
        new RectElement()
            .setWidth(100)
            .setHeight(100),
        new CircleElement()
            .setWidth(100)
            .setHeight(100)
      )
    )
        .setPosFromXY(50, 50)
  )
);
```

