USE [BYD]
GO

/****** Object:  Table [dbo].[Auction]    Script Date: 2023-06-14 2:18:13 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[News](
	[NewsId] [int] IDENTITY(1,1) NOT NULL,
	[NewsName] [nvarchar](200) NOT NULL,
	[NewsDescription] [nvarchar](max) NULL,
	[NewsStartDate] [datetime] NOT NULL,
	Expired bit not null,
	[EnteredBy] int null,
	EnteredDate datetime null,
 CONSTRAINT [PK_News] PRIMARY KEY CLUSTERED 
(
	[NewsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


