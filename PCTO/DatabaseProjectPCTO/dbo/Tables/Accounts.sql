CREATE TABLE [dbo].[Accounts] (
    [account_id]        INT           NOT NULL,
    [username]          VARCHAR (50)  NOT NULL,
    [password]          VARCHAR (100) NOT NULL,
    [email]             VARCHAR (100) NOT NULL,
    [full_name]         VARCHAR (100) NOT NULL,
    [address]           VARCHAR (200) NOT NULL,
    [phone]             VARCHAR (20)  NOT NULL,
    [registration_date] DATE          NOT NULL,
    [last_login]        DATETIME      NULL,
    [is_admin]          INT           DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([account_id] ASC)
);


GO

