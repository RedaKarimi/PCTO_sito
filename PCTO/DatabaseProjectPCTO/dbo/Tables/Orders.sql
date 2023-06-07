CREATE TABLE [dbo].[Orders] (
    [order_id]     INT             NOT NULL,
    [account_id]   INT             NULL,
    [order_date]   DATE            NOT NULL,
    [total_amount] DECIMAL (10, 2) NOT NULL,
    PRIMARY KEY CLUSTERED ([order_id] ASC),
    FOREIGN KEY ([account_id]) REFERENCES [dbo].[Accounts] ([account_id])
);


GO

