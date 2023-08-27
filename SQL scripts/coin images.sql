/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) c.[CoinId]
      ,[CoinNumber]
      ,[Name]      ,[CompanyId]    
      ,[IsAvialable]
      ,[EnteredUserId]
      ,[EnteredDate]
	  ,len(ci.image1),len(ci.image2),len(ci.image3)
	  ,len(co.image1),len(co.image2),len(co.image3)
  FROM [BYD].[dbo].[Coin] c
  left join dbo.Coin_Images ci on c.CoinId = ci.CoinId
  left join dbo.Coin_Images_Original co on c.CoinId = co.CoinId


  --exec [dbo].[Coin_Delete] 34