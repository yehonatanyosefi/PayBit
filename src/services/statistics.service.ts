import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { UtilService } from './util.service'

const EXCHANGE_KEY = 'exchangeRate'
const CHART_DATA_KEY = 'chartData'
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private apiKey = '5MN8K41GQA1SHD0L'
  private exchangeRate: BehaviorSubject<number> = new BehaviorSubject<number>(
    3.6
  )

  private pizzaIndicatorData: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([])
  private chartData$ = new BehaviorSubject<any[]>([])

  commodities = [
    { symbol: 'WEAT', name: 'Wheat (Flour)' },
    { symbol: 'COW', name: 'Livestock (Meat)' },
    { symbol: 'CORN', name: 'Corn (Corn Syrup)' },
    { symbol: 'JJGTF', name: 'Grains (Tomatoes)' },
    { symbol: 'MOO', name: 'Agriculture (Cheese)' },
  ]
  constructor(private http: HttpClient, private utilService: UtilService) {
    this.updateChartData()
  }

  getExchangeRate(): void {
    const apiUrl = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=ILS&apikey=${this.apiKey}`
    const exchangeRateFromStorage: number | null =
      this.utilService.load(EXCHANGE_KEY)
    if (exchangeRateFromStorage) {
      this.exchangeRate.next(exchangeRateFromStorage)
      return
    }
    this.http.get(apiUrl).subscribe((response: any) => {
      const rate = parseFloat(
        response['Realtime Currency Exchange Rate']['5. Exchange Rate']
      )
      this.utilService.save(EXCHANGE_KEY, rate)
      this.exchangeRate.next(rate)
    })
  }

  getExchangeRateValue(): Observable<number> {
    return this.exchangeRate.asObservable()
  }

  getChartData() {
    return this.chartData$.asObservable()
  }

  updateChartData() {
    this.getExchangeRate()
    this.getPizzaIndicatorData()
  }

  private getPizzaIndicatorData(): void {
    const chartDataFromStorage: any[] | null =
      this.utilService.load(CHART_DATA_KEY)
    if (chartDataFromStorage) {
      this.chartData$.next(chartDataFromStorage)
      return
    }
    let fetchedDataCount = 0

    this.commodities.forEach((commodity) => {
      const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${commodity.symbol}&apikey=${this.apiKey}`

      this.http.get(apiUrl).subscribe((response: any) => {
        if (!response || !response['Time Series (Daily)']) {
          console.error('Invalid API response:', response)
          return
        }

        const timeSeries = response['Time Series (Daily)']
        const dates = Object.keys(timeSeries)
        const latestPrice = parseFloat(
          timeSeries[dates[0]]['5. adjusted close']
        )
        const prevPrice = parseFloat(timeSeries[dates[1]]['5. adjusted close'])
        const growth = ((latestPrice - prevPrice) / prevPrice) * 100

        const currentData = this.pizzaIndicatorData.getValue()
        currentData.push({
          name: commodity.name,
          value: growth,
        })
        this.pizzaIndicatorData.next(currentData)

        fetchedDataCount++
        if (fetchedDataCount === this.commodities.length) {
          const chartData = this.pizzaIndicatorData.getValue()
          this.utilService.save(CHART_DATA_KEY, chartData)
          this.chartData$.next(chartData)
        }
      })
    })
  }
}
