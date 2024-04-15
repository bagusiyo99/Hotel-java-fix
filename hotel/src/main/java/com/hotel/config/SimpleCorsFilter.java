// Paket dan impor
package com.hotel.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
// Menetapkan urutan filter ini sebagai yang paling tinggi (paling awal)
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SimpleCorsFilter implements Filter {

    // Metode ini mengatur header HTTP untuk menangani CORS
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        // Mengonversi parameter res dan req menjadi HttpServletResponse dan HttpServletRequest
        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;

        // Membuat peta untuk menyimpan nilai
        Map<String, String> map = new HashMap<>();

        // Mendapatkan header "origin" dari permintaan
        String originHeader = request.getHeader("origin");

        // Mengatur header HTTP untuk mengizinkan origin tertentu (dalam hal ini, dari header "origin" yang diterima)
        response.setHeader("Access-Control-Allow-Origin", originHeader);
        // Mengizinkan metode HTTP tertentu
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        // Mengatur waktu penyimpanan maksimum dalam cache untuk respons preflight CORS
        response.setHeader("Access-Control-Max-Age", "3600");
        // Mengizinkan semua header HTTP
        response.setHeader("Access-Control-Allow-Headers", "*");

        // Menangani permintaan OPTIONS (preflight) dengan mengembalikan status OK
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            // Meneruskan permintaan ke filter berikutnya dalam rantai
            chain.doFilter(req, res);
        }
    }

    // Metode inisialisasi filter (tidak diimplementasikan dalam contoh ini)
    @Override
    public void init(FilterConfig filterConfig) {
    }

    // Metode penghancuran filter (tidak diimplementasikan dalam contoh ini)
    @Override
    public void destroy() {
    }
}
