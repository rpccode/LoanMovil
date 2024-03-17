import React from 'react';
import { View, Text } from 'react-native';
import { formatDate } from '.';
import { loanWhitDues } from '../Configs';

// Función para generar el contenido HTML del PDF
export const generateHTMLContent = (loanDetails: loanWhitDues) => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            width: 80%;
            margin: 0 auto;
          }
          h1, h2, p {
            margin: 0;
          }
          h1 {
            font-size: 24px;
            color: #0047ab;
          }
          h2 {
            font-size: 20px;
            color: #333;
          }
          p {
            font-size: 16px;
            margin-bottom: 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Detalles del préstamo:</h1>
          <p><strong>Cantidad:</strong> ${loanDetails.loan.Amount}</p>
          <p><strong>Fecha de inicio:</strong> ${formatDate(loanDetails.loan.Start_date)}</p>
          <p><strong>Interés:</strong> ${loanDetails.loan.Interest}%</p>
          <p><strong>Número de Cuotas:</strong> ${loanDetails.loan.Dues}</p>
          
          <h2>Cuotas:</h2>
          <table>
            <thead>
              <tr>
                <th>Número de Cuota</th>
                <th>Monto de Cuota</th>
                <th>Interés</th>
                <th>Total a Pagar</th>
                <th>Fecha de Inicio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${loanDetails.dues.map(due => `
                <tr>
                  <td>${due.Dues_num}</td>
                  <td>${due.Dues_amount}</td>
                  <td>${due.Total_interest}</td>
                  <td>${due.Total_amount}</td>
                  <td>${formatDate(due.Start_date)}</td>
                  <td>${due.StateId}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `;
};