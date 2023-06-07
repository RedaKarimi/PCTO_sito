CREATE TABLE [dbo].[OrderDetails] (
    [order_detail_id] INT             NOT NULL,
    [order_id]        INT             NULL,
    [product_id]      INT             NULL,
    [quantity]        INT             NOT NULL,
    [price]           DECIMAL (10, 2) NOT NULL,
    PRIMARY KEY CLUSTERED ([order_detail_id] ASC),
    FOREIGN KEY ([order_id]) REFERENCES [dbo].[Orders] ([order_id]),
    FOREIGN KEY ([product_id]) REFERENCES [dbo].[Products] ([product_id])
);


GO

