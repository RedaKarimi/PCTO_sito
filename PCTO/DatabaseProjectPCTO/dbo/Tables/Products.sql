CREATE TABLE [dbo].[Products] (
    [product_id]   INT             NOT NULL,
    [product_name] VARCHAR (100)   NOT NULL,
    [category_id]  INT             NULL,
    [price]        DECIMAL (10, 2) NOT NULL,
    [quantity]     INT             NOT NULL,
    PRIMARY KEY CLUSTERED ([product_id] ASC),
    FOREIGN KEY ([category_id]) REFERENCES [dbo].[Categories] ([category_id])
);


GO

