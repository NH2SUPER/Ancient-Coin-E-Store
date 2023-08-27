
USE [BYD]
GO
/****** Object:  User [intranetUser]    Script Date: 2023-05-27 12:36:43 AM ******/
CREATE USER [intranetUser] FOR LOGIN [intranetUser] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [intranetUser]
GO



	
/****** Object:  UserDefinedFunction [dbo].[GetLeftTime]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[GetLeftTime] 
(
	@startDate datetime, 
	@endDate datetime
)
RETURNS varchar(50)
AS
BEGIN
	
	declare @mins int = DATEDIFF(SECOND, @startDate, @endDate)
	return	cast(@mins/86400 as varchar(10)) + '.' + 
			cast((@mins/3600)%24 as varchar(2)) + '.' + 
			cast((@mins/60)%60 as varchar(2)) + '.' +
			cast(@mins % 60 as varchar(2))
	--select @mins % 60 as seconds, (@mins/60)%60 as minutes, (@mins/3600)%24 as hours, @mins/86400 as days

END
GO


	
/****** Object:  Table [dbo].[Auction]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auction](
	[AuctionId] [int] IDENTITY(1,1) NOT NULL,
	[AuctionName] [nvarchar](200) NOT NULL,
	[AuctionDate] [datetime] NOT NULL,
	[AuctionDescription] [nvarchar](max) NULL,
 CONSTRAINT [PK_Auction] PRIMARY KEY CLUSTERED 
(
	[AuctionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

	
/****** Object:  Table [dbo].[Auction_Lots]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auction_Lots](
	[AuctionId] [int] NOT NULL,
	[LotNumber] [varchar](10) NOT NULL,
	[CoinId] [int] NULL,
	[LotDescription] [nvarchar](4000) NULL,
	[EstimatePrice] [float] NULL,
	[MinPrice] [money] NULL,
	[InitPrice] [float] NOT NULL,
	[CurrentPrice] [float] NOT NULL,
	[FinalPrice] [float] NOT NULL,
	[FinalUserId] [int] NOT NULL,
	[FinalBidDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Auction_Lots] PRIMARY KEY CLUSTERED 
(
	[AuctionId] ASC,
	[LotNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Certification]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Certification](
	[CertificationId] [int] NULL,
	[CertificationBy] [nvarchar](20) NULL,
	[CertificationLevel] [nvarchar](100) NULL,
	[CertificationScore] [int] NULL,
	[CertificationNumber] [varchar](50) NULL,
	[CertificationComment] [nvarchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Coin]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Coin](
	[CoinId] [int] IDENTITY(1,1) NOT NULL,
	[CoinNumber] [varchar](15) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[CountryCode] [varchar](5) NULL,
	[Country] [nvarchar](200) NULL,
	[TypeId] [int] NULL,
	[CompositionId] [int] NULL,
	[CompositionPercent] [float] NULL,
	[FaceValue] [nvarchar](100) NULL,
	[Year] [nvarchar](50) NULL,
	[CertificationId] [int] NULL,
	[Weight] [float] NULL,
	[Diameter] [float] NULL,
	[Condition] [int] NULL,
	[MintDate] [datetime] NULL,
	[IsAvialable] [bit] NULL,
	[EnteredUserId] [int] NOT NULL,
	[EnteredDate] [datetime] NOT NULL,
	[UpdatedUserId] [int] NOT NULL,
	[UpdatedDate] [datetime] NOT NULL,
	[IsCirculated] [bit] NULL,
	[Description] [nvarchar](2000) NULL,
	[StartPrice] [money] NULL,
	[Interval] [varchar](50) NULL,
	[LowestPrice] [money] NULL,
	[Increment] [money] NULL,
	[EndDateTime] [datetime] NULL,
	[StartDateTime] [datetime] NULL,
 CONSTRAINT [PK_Coin] PRIMARY KEY CLUSTERED 
(
	[CoinId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Coin_Images]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Coin_Images](
	[CoinId] [int] NOT NULL,
	[Image1] [varchar](max) NULL,
	[Image2] [varchar](max) NULL,
	[Image3] [varchar](max) NULL,
	[Image4] [varchar](max) NULL,
	[Image5] [varchar](max) NULL,
	[Image6] [varchar](max) NULL,
 CONSTRAINT [PK_Coin_Images] PRIMARY KEY CLUSTERED 
(
	[CoinId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


	
/****** Object:  Table [dbo].[Company]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Company](
	[CompanyId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyEmail] [nvarchar](100) NOT NULL,
	[CompanyName] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[EnteredDate] [datetime] NOT NULL,
	[EnteredUserId] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedUserId] [int] NULL,
 CONSTRAINT [PK_CompanyId] PRIMARY KEY CLUSTERED 
(
	[CompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Composition]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Composition](
	[CompositionId] [int] NULL,
	[CompositionName] [nvarchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Image]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Image](
	[CoinId] [int] NOT NULL,
	[ImageId] [int] NOT NULL,
	[Name] [nvarchar](200) NULL,
	[ImageContent] [varbinary](max) NULL,
	[EnteredUserId] [int] NOT NULL,
	[EnteredDate] [datetime] NOT NULL,
	[UpdatedUserId] [int] NOT NULL,
	[UpdatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Image] PRIMARY KEY CLUSTERED 
(
	[CoinId] ASC,
	[ImageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lot]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lot](
	[LotId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NOT NULL,
	[Descrption] [nvarchar](4000) NOT NULL,
	[EnteredUserId] [int] NOT NULL,
	[EnteredDate] [datetime] NOT NULL,
	[UpdatedUserId] [int] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_Lot] PRIMARY KEY CLUSTERED 
(
	[LotId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[LastName] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[EnteredDate] [datetime] NOT NULL,
	[EnteredUserId] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedUserId] [int] NULL,
	[Password] [nvarchar](100) NULL,
	[Phone] [nvarchar](20) NULL,
	[Mobile] [nvarchar](20) NULL,
	[Address1] [nvarchar](100) NULL,
	[City] [nvarchar](50) NULL,
	[Province] [nvarchar](50) NULL,
	[PostalCode] [nvarchar](20) NULL,
	[Country] [nvarchar](50) NULL,
	[Address2] [nvarchar](100) NULL,
 CONSTRAINT [PK_UserId] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_Auction_Xrf]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_Auction_Xrf](
	[UserId] [int] NOT NULL,
	[AuctionId] [int] NOT NULL,
	[AuctionDateTime] [datetime] NOT NULL,
	[EnteredDate] [datetime] NULL,
	[EnteredUserId] [int] NULL,
 CONSTRAINT [PK_User_Auction_Xrf] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[AuctionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_Token_Xrf]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_Token_Xrf](
	[UserId] [int] NOT NULL,
	[TokenId] [int] NOT NULL,
	[EnteredDate] [datetime] NULL,
	[EnteredUserId] [int] NULL,
 CONSTRAINT [PK_User_Token_Xrf] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[TokenId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserToken]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserToken](
	[TokenId] [int] IDENTITY(1,1) NOT NULL,
	[TokenIdentity] [nvarchar](100) NOT NULL,
	[TokenBody] [varchar](max) NOT NULL,
	[ValidFrom] [datetime] NULL,
	[ValidTo] [datetime] NULL,
	[EnteredDate] [datetime] NOT NULL,
	[EnteredUserId] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedUserId] [int] NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_UserToken] PRIMARY KEY CLUSTERED 
(
	[TokenId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Company] ADD  CONSTRAINT [DF_Company_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Company] ADD  CONSTRAINT [DF_Company_EnteredDate]  DEFAULT (getdate()) FOR [EnteredDate]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_EnteredDate]  DEFAULT (getdate()) FOR [EnteredDate]
GO
ALTER TABLE [dbo].[UserToken] ADD  CONSTRAINT [DF_UserToken_ValidFrom]  DEFAULT (getdate()) FOR [ValidFrom]
GO
ALTER TABLE [dbo].[UserToken] ADD  CONSTRAINT [DF_UserToken_ValidTo]  DEFAULT (dateadd(day,(15),getdate())) FOR [ValidTo]
GO
ALTER TABLE [dbo].[UserToken] ADD  CONSTRAINT [DF_UserToken_EnteredDate]  DEFAULT (getdate()) FOR [EnteredDate]
GO
/****** Object:  StoredProcedure [dbo].[Coin_Add]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE  PROCEDURE [dbo].[Coin_Add](
	@Name nvarchar(200),
	@Description nvarchar(2000),
	@StartPrice money, 
	@Interval char(50),
	@Increment money,
	@LowestPrice money,
	@ImageUrl1 varchar(max)='',
	@ImageUrl2 varchar(max)='',
	@ImageUrl3 varchar(max)='',
	@ImageUrl4 varchar(max)='',
	@ImageUrl5 varchar(max)='',
	@ImageUrl6 varchar(max)='',
	@UserId int
)
AS
Begin
	SET NOCOUNT ON

	insert	into BYD.dbo.Coin
			([Name], [Description], CoinNumber, [StartPrice], [Interval], Increment, [LowestPrice], 
			[IsAvialable],[EnteredUserId],[EnteredDate], [UpdatedUserId], [UpdatedDate])
	values	(@Name, @Description, '', @StartPrice, @Interval, @Increment, @LowestPrice,
			1, @UserId, getdate(), @UserId, getdate())

	declare @newCoinId int = @@identity

	insert	into BYD.dbo.Coin_Images
			(CoinId, Image1, Image2, Image3, Image4, Image5, Image6)
	values	(@newCoinId, @ImageUrl1, @ImageUrl2, @ImageUrl3, @ImageUrl4, @ImageUrl5, @ImageUrl6)


	SELECT	[CoinId],[CoinNumber],[Name],[CountryCode],[Country],[TypeId],[CompositionId]
			,[CompositionPercent],[FaceValue],[Year],[CertificationId],[Weight]
			,[Diameter],[Condition],[MintDate]
	FROM	[BYD].[dbo].[Coin]

END
GO
/****** Object:  StoredProcedure [dbo].[CoinAuctionPrice_Update]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE  PROCEDURE [dbo].[CoinAuctionPrice_Update]
(
	@AuctionId int,
	@LotNumber varchar(10),
	@BidUserId int,
	@IteralPrice money
)
AS
Begin
	SET NOCOUNT ON

	declare @CurrentPrice money
	declare @MinPrice money
	select	@CurrentPrice = CurrentPrice, @MinPrice = MinPrice 
	from	[dbo].[Auction_Lots]
	where	AuctionId = @AuctionId and LotNumber = @LotNumber

	if		@CurrentPrice - @IteralPrice >= @MinPrice
			begin
				update	[dbo].[Auction_Lots]
				set		CurrentPrice = CurrentPrice - @IteralPrice,
						FinalBidDate = getdate()
				where	AuctionId = @AuctionId and LotNumber = @LotNumber
			end
	else
			begin
				update	[dbo].[Auction_Lots]
				set		CurrentPrice = @MinPrice,
						FinalBidDate = getdate()
				where	AuctionId = @AuctionId and LotNumber = @LotNumber
			end

END
GO
/****** Object:  StoredProcedure [dbo].[ReferCoins_List]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  PROCEDURE [dbo].[ReferCoins_List]

AS
Begin

	SET NOCOUNT ON

	SELECT	[CoinId],[CoinNumber],[Name],[CountryCode],[Country],[TypeId],[CompositionId]
			,[CompositionPercent],[FaceValue],[Year],[CertificationId],[Weight],
			[Description],[StartPrice],[Interval],[LowestPrice],[Increment],[Diameter],[Condition],[MintDate],EndDateTime
	FROM	[BYD].[dbo].[Coin]

	SELECT	[CoinId],[Image1],[Image2],[Image3],[Image4],[Image5],[Image6]
	FROM	[BYD].[dbo].[Coin_Images]
	where	CoinId >10

END
GO
/****** Object:  StoredProcedure [dbo].[User_Add]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE  PROCEDURE [dbo].[User_Add](
	@Email [nvarchar](100),
	@FirstName [nvarchar](100),
	@LastName [nvarchar](100),
	@Password [nvarchar](100),
	@Phone [nvarchar](20),
	@Mobile [nvarchar](20),
	@Address1 [nvarchar](100),
	@Address2 [nvarchar](100),
	@City [nvarchar](50),
	@Province [nvarchar](50),
	@PostalCode [nvarchar](20),
	@Country [nvarchar](50)
)
AS
Begin
	SET NOCOUNT ON

	if not exists (select 1 from dbo.[User] where email = @Email)
		begin
			insert	into BYD.dbo.[User]
					([Email],[FirstName],[LastName],[Password],[Phone],[Mobile],[Address1],[City],[Province],[PostalCode],[Country])
			values	(@Email, @FirstName,@LastName,	@Password, @Phone,@Mobile,@Address1,@City,@Province,@PostalCode,	@Country)
		end
	else
		begin

			declare @userId int
			select	@userId = Userid from dbo.[User] where email = @Email

			update	dbo.[User]
			set		[Password] = @Password,
					FirstName = @FirstName, LastName = @LastName,Phone = @Phone,
					Address1 = @Address1, Address2 = @Address2,
					City = @City, Province = @Province, PostalCode = @PostalCode, Country = @Country,
					UpdatedDate = getdate(), UpdatedUserId = @userId
			where	UserId = @userId
		end
END
GO
/****** Object:  StoredProcedure [dbo].[User_Get_By_Email]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE  PROCEDURE [dbo].[User_Get_By_Email](
	@UserName [nvarchar](100)
)
AS
Begin
	SET NOCOUNT ON


	select	* from dbo.[User] where  email = @UserName

END
GO
/****** Object:  StoredProcedure [dbo].[User_Token_Add]    Script Date: 2023-05-27 12:36:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE  PROCEDURE [dbo].[User_Token_Add](
	@UserName [nvarchar](100),
	@Token [varchar](max)
)
AS
Begin
	SET NOCOUNT ON

	insert	into dbo.UserToken (
			[TokenIdentity], [TokenBody], [ValidFrom], [ValidTo], IsActive
	) values (
			@UserName, @Token, getdate(), DATEADD(day, 1, getdate()), 1
	)

END
GO
USE [master]
GO
ALTER DATABASE [BYD] SET  READ_WRITE 
GO
