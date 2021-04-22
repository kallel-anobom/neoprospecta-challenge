from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Customer
from .serializers import CustomerSerializer

class CustomerViewSet(viewsets.ModelViewSet):
  def list(self, request):
    customers = Customer.objects.all()
    serializer = CustomerSerializer(customers, many=True)

    return Response(serializer.data)

  def create(self, request):
    serializer = CustomerSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data, status=status.HTTP_201_CREATED)

  def get(self, request, pk=None):
    customer = Customer.objects.get(id=pk)
    serializer = CustomerSerializer(customer)

    return Response(serializer.data)

  def update(self, request, pk=None):
    customer = Customer.objects.get(id=pk)
    serializer = CustomerSerializer(instance=customer, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

  def delete(self, request, pk=None):
    customer = Customer.objects.get(id=pk)
    customer.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)
