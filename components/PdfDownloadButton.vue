<template>
  <div class="flex justify-center my-8">
    <UButton
      icon="i-heroicons-document-arrow-down"
      color="primary"
      variant="solid"
      size="xl"
      :loading="loading"
      @click="downloadPdf"
    >
      {{ loading ? 'Generating PDF...' : 'Download PDF' }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const loading = ref(false);

async function downloadPdf() {
  loading.value = true;
  const element = document.getElementById('print-content'); // Assume an ID for the content to be printed

  if (!element) {
    console.error('Element with ID "print-content" not found.');
    loading.value = false;
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Increase scale for better quality
      useCORS: true, // Needed if images are from external sources
      allowTaint: true, // Allow tainting the canvas if images are from external sources
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Add content to PDF, splitting if necessary
    let position = 0;
    let heightLeft = pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
      if (heightLeft > 0) {
        pdf.addPage();
      }
    }

    pdf.save('portfolio.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Scoped styles for the button */
</style>