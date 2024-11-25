# created on 22/07/2024 à 19:10:31

# Function to add in models.py


from main.models import Estimate
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
    CreateAPIView,
)
from main.serializers.estimate_serializers import (
    EstimateSerializer,
    CreateEstimateSerializer,
    UpdateEstimateSerializer,
    RetrieveEstimateSerializer,
)
from rest_framework.response import Response
from django.template.loader import render_to_string
from django.http import HttpResponse
from xhtml2pdf import pisa

import logging


logger = logging.getLogger(__name__)


class ListEstimateAPIView(ListAPIView):
    # authentication_classes = [TokenAuthentication]

    model = Estimate
    queryset = Estimate.objects.all()
    serializer_class = EstimateSerializer


class CreateEstimateAPIView(CreateAPIView):
    # authentication_classes = [TokenAuthentication]

    model = Estimate
    queryset = Estimate.objects.all()
    serializer_class = CreateEstimateSerializer


class UpdateEstimateAPIView(UpdateAPIView):
    # authentication_classes = [TokenAuthentication]

    model = Estimate
    queryset = Estimate.objects.all()
    serializer_class = UpdateEstimateSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "estimate_uid"


class RetrieveEstimateAPIView(RetrieveAPIView):
    # authentication_classes = [TokenAuthentication]

    model = Estimate
    queryset = Estimate.objects.all()
    serializer_class = RetrieveEstimateSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "estimate_uid"


class DeleteEstimateAPIView(DestroyAPIView):
    # authentication_classes = [TokenAuthentication]

    model = Estimate
    queryset = Estimate.objects.all()
    serializer_class = EstimateSerializer
    lookup_field = "uid"
    lookup_url_kwarg = "estimate_uid"


from xhtml2pdf import pisa
from django.template.loader import render_to_string
from django.http import HttpResponse


class GenerateEstimatePDFView(CreateAPIView):

    def get(self, request, estimate_uid):
        try:
            estimate = Estimate.objects.get(uid=estimate_uid)
        except Estimate.DoesNotExist:
            return Response({"error": "Estimate not found"}, status=404)

        serializer = EstimateSerializer(estimate)
        html_content = render_to_string(
            "estimate_template.html", {"estimate": serializer.data}
        )

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = (
            f'attachment; filename="estimate_{estimate.estimate_number}.pdf"'
        )
        pisa_status = pisa.CreatePDF(html_content, dest=response)

        if pisa_status.err:
            return HttpResponse(f"Error generating PDF: {pisa_status.err}", status=500)

        return response
