import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Chart, registerables } from 'chart.js'
import { StatisticsService } from '../../services/statistics.service'

Chart.register(...registerables)

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  chart: any
  exchangeRate: number = 3.62

  constructor(private chartService: StatisticsService) {}

  ngOnInit(): void {
    this.chartService.updateChartData()
    this.chartService.getExchangeRateValue().subscribe((rate) => {
      this.exchangeRate = rate
    })
  }
  ngAfterViewInit() {
    this.chart = new Chart('myChart', {
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Change in price',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })

    this.chartService.getChartData().subscribe((data) => {
      this.chart.data.labels = data.map((item) => item.name)
      this.chart.data.datasets[0].data = data.map((item) => item.value)
      this.chart.update()
    })
  }
}
